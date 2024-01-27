import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import content from '../content/content.json';

export default function App({ Component, pageProps }: AppProps) {
  console.log("log from App:", content);
  

  return <Component {...pageProps} content={content}/>
}
