import { Helmet } from 'react-helmet-async';

import { NaceView } from 'src/sections/nace-kodlari/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <NaceView />
    </>
  );
}
