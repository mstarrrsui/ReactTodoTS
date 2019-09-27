interface AppSettings {
  hnDataUrl: string;
  hnSearchUrl: string;
}

interface Window {
  appSettings: AppSettings;
}
