import useStore from '@/store/useStore';
import { ASSETS } from '@/data/constants';

export default async function preloadAssets() {
  const { isPreloading, appPhase, totalMB: totalEstimatedMB } = useStore.getState();
  if (isPreloading || appPhase !== 'loading') return;

  useStore.setState({ isPreloading: true });

  try {
    const totalBytes = totalEstimatedMB * 1024 * 1024;
    const assetProgress = {};

    const updateGlobalProgress = () => {
      const totalLoadedBytes = Object.values(assetProgress).reduce((acc, val) => acc + val, 0);
      const progress = Math.min(Math.round((totalLoadedBytes / totalBytes) * 100), 99);
      const currentMB = (totalLoadedBytes / (1024 * 1024)).toFixed(1);

      useStore.setState({
        loadingProgress: progress,
        downloadedMB: currentMB,
      });
    };

    await Promise.all(
      ASSETS.map(async (asset) => {
        assetProgress[asset.key] = 0;
        const res = await fetch(asset.path);
        const reader = res.body.getReader();

        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          assetProgress[asset.key] += value.length;
          updateGlobalProgress();
        }

        if (asset.type === 'json') {
          const blob = new Blob(chunks);
          const text = await blob.text();
          const data = JSON.parse(text);
          useStore.setState({ [asset.key]: data });
        }
      }),
    );

    useStore.setState({ loadingProgress: 100 });
  } catch (err) {
    console.error('Failed to preload assets:', err);
    useStore.setState({ loadingProgress: 100 });
  }
}
