import { useState, useEffect } from 'react';

type SVGIconFromStringProps = {
  blobString: string;
};

export function SVGIconFromString({ blobString: url }: SVGIconFromStringProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const temp = URL.createObjectURL(
      new Blob([url], { type: 'image/svg+xml' })
    );
    setImgSrc(temp);
    return () => URL.revokeObjectURL(temp);
  }, []);

  if (!imgSrc) return <div></div>;
  return <img style={{ width: 'inherit', height: 'inherit' }} src={imgSrc} />;
}
