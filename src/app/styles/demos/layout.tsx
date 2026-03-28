export default function DemoLayout({ children }: { children: React.ReactNode }) {
  // This layout exists to be overridden by each demo page
  // Demo pages are self-contained and don't need the main KMD nav/footer
  return <>{children}</>;
}
