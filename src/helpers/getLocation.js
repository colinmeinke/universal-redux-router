const encodeMapping = new Map([
  [ '%', '%25' ],
  [ '/', '%2F' ],
  [ '?', '%3F' ],
  [ '=', '%3D' ],
  [ '&', '%26' ],
  [ '#', '%23' ],
  [ ':', '%3A' ],
  [ '<', '%3C' ],
  [ '>', '%3E' ],
  [ '[', '%5B' ],
  [ ']', '%5D' ],
  [ '{', '%7B' ],
  [ '}', '%7D' ],
  [ '|', '%7C' ],
  [ '\\', '%5C' ],
  [ '^', '%5E' ],
  [ '~', '%7E' ],
  [ '`', '%60' ],
  [ '"', '%22' ],
  [ ' ', '+' ],
]);

const decode = value => (
  [ ...encodeMapping.entries() ].reduce(( str, [ k, v ]) => (
    str.split( v ).join( k )
  ), value.toString())
);

const encode = value => (
  [ ...encodeMapping.entries() ].reduce(( str, [ k, v ]) => (
    str.split( k ).join( v )
  ), value.toString())
);

const parseQueryString = queryString => {
  const query = {};
  const queryParts = queryString.split( '&' );

  queryParts.forEach( part => {
    const [ key, value ] = part.split( '=' );

    const isArray = key.includes( '%5B%5D' );
    const isObject = key.match( /%5B(.)*%5D/ );

    if ( isArray ) {
      const rootKey = key.replace( '%5B%5D', '' );

      if ( query.hasOwnProperty( rootKey )) {
        value.split( /[,]+/ ).forEach( v => {
          query[ rootKey ].push( decode( v ));
        });
      } else {
        query[ rootKey ] = value.split( /[,]+/ ).map( decode );
      }
    } else if ( isObject ) {
      const rootKey = key.replace( /%5B(.*)%5D/, '' );
      const objectKey = key.match( /%5B(.*)%5D/ ).pop();

      if ( !query.hasOwnProperty( rootKey )) {
        query[ rootKey ] = {};
      }

      query[ rootKey ][ objectKey ] = decode( value );
    } else {
      query[ key ] = decode( value );
    }
  });

  return query;
};

const getQuery = to => {
  const isArray = Array.isArray( to ) && to.length > 1;

  if ( isArray ) {
    for ( const part of to ) {
      if ( typeof part === 'object' ) {
        return part;
      }
    }
  } else {
    const url = to.toString();

    if ( url.includes( '?' )) {
      const [ , queryString ] = url.split( '?' );
      return parseQueryString( queryString );
    }
  }

  return {};
};

const getQueryString = query => {
  const queryKeys = Object.keys( query );

  if ( queryKeys.length ) {
    const parts = queryKeys.map( k => {
      const isArray = Array.isArray( query[ k ]);
      const isObject = typeof query[ k ] === 'object';

      if ( isArray ) {
        if ( query[ k ].length ) {
          const key = encode( `${ k }[]` );
          const value = encode( query[ k ].join( ',' ));
          return `${ key }=${ value }`;
        }
      } else if ( isObject ) {
        const objParts = Object.keys( query[ k ]).map( objKey => {
          const key = encode( `${ k }[${ objKey }]` );
          const value = encode( query[ k ][ objKey ]);

          if ( value.length ) {
            return `${ key }=${ value }`;
          }

          return null;
        }).filter( part => part !== null );

        return objParts.length ? `${ objParts.join( '&' )}` : null;
      } else {
        const key = encode( `${ k }` );
        const value = encode( query[ k ]);

        if ( value.length ) {
          return `${ key }=${ value }`;
        }
      }

      return null;
    }).filter( part => part !== null );

    return parts.length ? `?${ parts.join( '&' )}` : '';
  }

  return '';
};

const getPathName = to => {
  const isArray = Array.isArray( to ) && to.length > 1;

  if ( isArray ) {
    const pathNameParts = [];

    to.forEach( part => {
      if ([ 'array', 'object' ].indexOf( typeof part ) === -1 ) {
        pathNameParts.push(
          part.toString().replace( /(^\/|\/$)/, '' )
        );
      }
    });

    return `/${ pathNameParts.join( '/' )}`;
  }

  const url = to.toString();
  const [ pathName ] = url.split( '?' );

  return `/${ pathName.replace( /(^\/|\/$)/, '' )}`;
};

const getLocation = to => {
  const pathName = getPathName( to );
  const query = getQuery( to );
  const queryString = getQueryString( query );
  const url = pathName + queryString;

  return { pathName, query, queryString, url };
};

export { getPathName, getQuery, getQueryString };

export default getLocation;
