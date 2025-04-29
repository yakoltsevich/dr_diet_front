import {Snippet} from "@heroui/snippet";
import {Code} from "@heroui/code";
import {Button} from "@heroui/button";


export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 ">

            <div className="mt-8">
                <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
                </Snippet>
            </div>
            <Button>dasdasdas</Button>
        </section>
    );
}
