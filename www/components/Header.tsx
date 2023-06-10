import DocsTitle from "./DocsTitle.tsx";
import NavigationBar from "./NavigationBar.tsx";

export default function Header(props: { title: string; active: string }) {
  return (
    <div class="bg-green-300">
      <header class="mx-auto max-w-screen-xl flex gap-3 justify-between px-4">
        <div class="py-2 md:px-4 md:py-4 md:px-4 flex items-center">
          <Logo />
          <DocsTitle title={props.title} />
        </div>
        <NavigationBar class="hidden md:flex" active={props.active} />
      </header>
      <NavigationBar class="md:hidden pb-3" active={props.active} />
    </div>
  );
}

function Logo() {
  return (
    <a href="/" class="flex mr-2 items-center" aria-label="Top Page">
      <img
        src="/logo.svg"
        alt="Fresh logo"
        width={38}
        height={38}
        style="margin-bottom:.1rem"
      />
    </a>
  );
}
