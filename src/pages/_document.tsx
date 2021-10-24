import React from 'react'
import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.png" />
                    <meta
                        name="description"
                        content="A DUNNA Alta Joalheria é uma marca inovadora, autêntica e audaciosa. Viemos com o propósito de inovar o ramo da joalheria brasileira, investindo no conceito de Brasilidade. Nossa inspiração vem das cores e formas da natureza."
                    />

                    {process.env.NODE_ENV === 'production' && (
                        <>
                            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                            <script
                                async
                                src="https://www.googletagmanager.com/gtag/js?id=UA-206765746-1"
                            ></script>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', 'UA-206765746-1');
                            `
                                }}
                            ></script>

                            {/* RD Station */}
                            <script
                                type="text/javascript"
                                async
                                src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/31b1baaa-692a-4486-97a9-784d5b4008be-loader.js"
                            ></script>
                        </>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
