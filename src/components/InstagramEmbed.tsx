interface InstagramEmbedProps {
  url: string;
}

// Renders Instagram's own official embed markup for a specific post/reel URL.
// The Instagram.tsx section loads embed.js once and calls
// window.instgrm.Embeds.process() to convert these blockquotes into iframes —
// no login or API access needed, just the public post URL.
export function InstagramEmbed({ url }: InstagramEmbedProps) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: '3px',
        margin: '0 auto',
        maxWidth: '540px',
        minWidth: '326px',
        padding: 0,
        width: '100%',
      }}
    />
  );
}
