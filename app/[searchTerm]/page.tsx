import GetWikiResults from "@/lib/getWikiResults"
import Item from "./components/item";


type Props = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: {searchTerm} }: Props ) {
    const wikiData: Promise<SearchResult> = GetWikiResults(searchTerm);
    const data = await wikiData;
    const disdplayTerm = searchTerm.replaceAll('%20', ' ')

    if (!data?.query?.pages) {
        return {
            title: `${disdplayTerm} Not Found`
        }
    }

    return {
        title: disdplayTerm,
        description: `Search result for ${disdplayTerm}`,
    }
}

export default async function SearchResults({ params: {searchTerm} }: Props ) {
    const wikiData: Promise<SearchResult> = GetWikiResults(searchTerm);
    const data = await wikiData;
    const displayTerm = searchTerm.replaceAll('%20', ' ')
    const results: Result[] | undefined = data?.query?.pages;

    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results
                ? Object.values(results).map(result => {
                    return <Item key={result.pageid} result={result} />
                })
            : <h2 className="p-2 text-xl">{`${displayTerm} not found!`}</h2>}
        </main>
    )

  return content
}

