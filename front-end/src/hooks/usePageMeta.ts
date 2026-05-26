import { useEffect } from "react";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — NeonScroll` : "NeonScroll";

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description ?? "NeonScroll — tech news and articles for engineers.";

    // Open Graph
    const setOg = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setOg("og:title", title || "NeonScroll");
    setOg("og:description", description ?? "Tech news and articles for engineers.");
    setOg("og:type", "website");
  }, [title, description]);
}
