import { Helmet } from 'react-helmet-async';

import { LokasyonView } from 'src/sections/lokasyonlar/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <LokasyonView />
    </>
  );
}
