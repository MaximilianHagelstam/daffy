import { useEffect, useRef } from "react";

const useDidMountEffect = (
  effectCallback: React.EffectCallback,
  dependencyList: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effectCallback();
    } else {
      didMount.current = true;
    }
  }, dependencyList);
};

export default useDidMountEffect;
