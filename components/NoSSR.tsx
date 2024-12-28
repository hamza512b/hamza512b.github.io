import React, { useEffect, useLayoutEffect, useState } from "react";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function NoSSR({
  children,
  defer,
}: React.PropsWithChildren<{
  defer?: boolean;
}>) {
  const [isMounted, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
export default NoSSR;
