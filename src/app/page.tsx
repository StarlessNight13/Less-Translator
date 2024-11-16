import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>LESS translation</title>
        <meta
          name="description"
          content="Translation and Dictionary in one place"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-base relative flex flex-1 flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-sky">LESS</span> Translation
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="bg-primary/60 hover:bg-primary/70 flex max-w-xs flex-col gap-4 rounded-xl p-4"
              href="/translation"
            >
              <h3 className="text-2xl font-bold">Translator →</h3>
              <div className="text-lg">
                Translate text from one language to another
              </div>
            </Link>
            <Link
              className="bg-secondary/60 hover:bg-secondary/70 flex max-w-xs flex-col gap-4 rounded-xl p-4"
              href="/dictionary"
            >
              <h3 className="text-2xl font-bold">Dictonary →</h3>
              <div className="text-lg">
                Search for words in different languages
              </div>
            </Link>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
