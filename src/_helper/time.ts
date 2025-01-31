export const timeAgo = (dateString: Date): string => {
    const now = new Date();
    // const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - dateString.getTime()) / 1000);
  
    const intervals: { [key: string]: number } = {
      y: 31536000, // 1 year = 60 * 60 * 24 * 365
      w: 604800,   // 1 week = 60 * 60 * 24 * 7
      d: 86400,    // 1 day = 60 * 60 * 24
      h: 3600,     // 1 hour = 60 * 60
      m: 60,       // 1 minute = 60
      s: 1         // 1 second
    };
  
    for (const [unit, seconds] of Object.entries(intervals)) {
      const value = Math.floor(diffInSeconds / seconds);
      if (value > 0) {
        return `${value}${unit} ago`;
      }
    }
  
    return "Just now";
  };
  