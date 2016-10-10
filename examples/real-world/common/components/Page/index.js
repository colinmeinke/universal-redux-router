import React from 'react'

const Page = ({ app }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>Universal Redux Router example</title>
      </head>
      <body>
        <section
          className='app'
          dangerouslySetInnerHTML={{ __html: app }}
        />
        <script defer src='/react.js' />
        <script defer src='/redux.js' />
        <script defer src='/react-redux.js' />
        <script defer src='/client.dist.js' />
      </body>
    </html>
  )
}

export default Page
