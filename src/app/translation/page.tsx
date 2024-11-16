import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchButton from "@/components/translation/SearchButton";
import { TranslationInput } from "@/components/translation/TranslationInput";
import { TranslationOutput } from "@/components/translation/TranslationOutput";
import { TranslatorSelection } from "@/components/translation/TranslatorSelection";
import { TranslationProvider } from "@/context/TranslationContext";
import LoadingBar from "@/components/translation/LoadingBar";

export default function Translation() {
  return (
    <TranslationProvider>
      <Card className="flex h-full flex-grow flex-col border-none bg-transparent">
        <CardHeader>
          <CardTitle>Translation</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-grow flex-col justify-center gap-4 sm:justify-start">
          <div className="flex flex-col gap-3 px-3 md:flex-row">
            <TranslatorSelection />
            <SearchButton />
          </div>
          <LoadingBar />

          <div className="flex min-h-[500px] flex-col justify-evenly gap-3 px-3 sm:flex-row">
            <TranslationInput />
            <TranslationOutput />
          </div>
        </CardContent>
      </Card>
    </TranslationProvider>
  );
}
