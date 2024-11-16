"use client";
import DataTableAR from "@/components/dictionary/arabdict/DataTable";
import ArabdicSelctor from "@/components/dictionary/arabdict/LangSelector";
import DataTableGL from "@/components/dictionary/glosbe/DataTable";
import GlosbeSelctor from "@/components/dictionary/glosbe/LangSelector";
import DataTableWR from "@/components/dictionary/wordreference/DataTable";
import LanguageSelect from "@/components/dictionary/wordreference/LangSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type DictionaryData, type Dictionarys } from "@/types/Dictionary";

import { api } from "@/trpc/react";
import { Search } from "lucide-react";
import { useState } from "react";

/**
 * A dictionary component that allows you to search words in three different dictionaries.
 * The dictionaries are arabdict, wordreference, and Glosbe.
 * The component uses a Tabs component to switch between the different dictionaries.
 * The component also uses a Input component to search for words.
 * The component uses a Button component to trigger the search.
 * The component uses a Skeleton component to show a loading state.
 * The component uses a DataTable component to show the search results.
 * The component uses a Mutation component to trigger the search.
 * The component uses a Query component to show the search results.
 * The component uses a useState hook to store the selected dictionary.
 * The component uses a useState hook to store the selected language.
 * The component uses a useState hook to store the search text.
 * The component uses a useState hook to store the loading state.
 * The component uses a useState hook to store the search results.
 * The component uses a useEffect hook to trigger the search when the selected dictionary changes.
 * The component uses a useEffect hook to trigger the search when the selected language changes.
 * The component uses a useEffect hook to trigger the search when the search text changes.
 * The component uses a useEffect hook to trigger the search when the loading state changes.
 * The component uses a useEffect hook to trigger the search when the search results change.
 */
export default function Dictionary() {
  const [Dictionary, setDictionary] = useState<Dictionarys>("arabdict");
  const [LanguageData, setLanguageData] = useState<string>("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState<DictionaryData | undefined>();

  const mutation = api.dictionary.lookupWord.useMutation({});

  const handleSearch = async () => {
    if (!text) {
      return;
    }

    try {
      setLoading(true);
      const result = await mutation.mutateAsync({
        text,
        selectedlanguage: LanguageData,
        dictionary: Dictionary,
      });
      setData((prev) => ({ ...prev, ...{ [Dictionary]: result } }));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card className="flex h-full flex-grow flex-col border-none bg-transparent">
      <CardHeader>
        <CardTitle>Dictionary</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              {Dictionary === "wordreference" ? (
                <LanguageSelect onChange={setLanguageData} loading={loading} />
              ) : Dictionary === "arabdict" ? (
                <ArabdicSelctor onChange={setLanguageData} loading={loading} />
              ) : (
                <GlosbeSelctor onChange={setLanguageData} loading={loading} />
              )}
            </div>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Search Word"
                onChange={(e) => setText(e.target.value)}
                value={text}
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus
              />
              <Button
                variant="outline"
                size={"icon"}
                onClick={handleSearch}
                disabled={loading}
              >
                <Search />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="arabdict"
              onValueChange={(value) =>
                setDictionary(value as "arabdict" | "glosbe" | "wordreference")
              }
              value={Dictionary}
            >
              <TabsList className="flex w-full flex-row">
                <TabsTrigger value="arabdict" className="flex-1">
                  arabdict
                </TabsTrigger>
                <TabsTrigger value="wordreference" className="flex-1">
                  wordreference
                </TabsTrigger>
                <TabsTrigger value="glosbe" className="flex-1">
                  Glosbe
                </TabsTrigger>
              </TabsList>
              <TabsContent value="arabdict">
                {/* <DataTableAR Data={Data} /> */}
                {
                  loading ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-px">
                        <Skeleton className="h-10 flex-1 rounded-none rounded-l" />
                        <Skeleton className="h-10 flex-1 rounded-none" />
                        <Skeleton className="h-10 flex-1 rounded-none rounded-r" />
                      </div>
                      <Skeleton className="h-10 w-full rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  ) : Data && "arabdict" in Data ? (
                    <DataTableAR Data={Data?.arabdict} />
                  ) : null // <DataTableAR Data={Data?.arabdict?.data[0]} />
                }
              </TabsContent>
              <TabsContent value="wordreference">
                {loading ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-px">
                      <Skeleton className="h-10 flex-1 rounded-none rounded-l" />
                      <Skeleton className="h-10 flex-1 rounded-none" />
                      <Skeleton className="h-10 flex-1 rounded-none rounded-r" />
                    </div>
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ) : Data && "wordreference" in Data ? (
                  <DataTableWR Data={Data?.wordreference} />
                ) : null}
              </TabsContent>
              <TabsContent value="glosbe">
                {loading ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-px">
                      <Skeleton className="h-10 flex-1 rounded-none rounded-l" />
                      <Skeleton className="h-10 flex-1 rounded-none" />
                      <Skeleton className="h-10 flex-1 rounded-none rounded-r" />
                    </div>
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ) : Data && "glosbe" in Data ? (
                  <DataTableGL Data={Data?.glosbe} />
                ) : null}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
