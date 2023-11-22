type PlaylistResponse = {
    playlists: {
      href: string;
      items: {
        collaborative: boolean;
        description: string;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: {
          height: number | null;
          url: string;
          width: number | null;
        }[];
        name: string;
        owner: {
          display_name: string;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        primary_color: null; // Change this if it has a specific type
        public: null; // Change this if it has a specific type
        snapshot_id: string;
        tracks: {
          href: string;
          total: number;
        };
        type: string;
        uri: string;
      }[];
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    };
  };
  
  export { PlaylistResponse };
  