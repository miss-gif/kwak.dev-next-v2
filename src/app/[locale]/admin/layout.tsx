export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header>헤더</header>
      <div>{children}</div>
    </section>
  );
}
