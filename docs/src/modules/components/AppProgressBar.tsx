import * as React from 'react';
import NProgress from 'nprogress';
import NProgressBar from '@mui/docs/NProgressBar';
import { useRouter } from 'next/router';

export default function AppProgressBar() {
  const router = useRouter();
  React.useEffect(() => {
    const nProgressStart = () => NProgress.start();
    const nProgressDone = () => NProgress.done();

    router.events.on('routeChangeStart', nProgressStart);
    router.events.on('routeChangeComplete', nProgressDone);
    router.events.on('routeChangeError', nProgressDone);
    return () => {
      router.events.off('routeChangeStart', nProgressStart);
      router.events.off('routeChangeComplete', nProgressDone);
      router.events.off('routeChangeError', nProgressDone);
    };
  }, [router]);

  return <NProgressBar />;
}
