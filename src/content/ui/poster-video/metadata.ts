import type { ItemMetadata } from "@/feature/catalog/types/catalog";

export default {
  title: "Poster Video",
  description:
    "A looping video preview that plays on hover, starting from a poster frame.",
  tags: ["video", "hover"],
  previews: [
    {
      id: "video",
      renderer: "video",
      src: "/previews/poster-video.mp4",
      poster: "/previews/poster-video-poster.png",
    },
  ],
} satisfies ItemMetadata;
