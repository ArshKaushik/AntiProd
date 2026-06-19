import BranchCanvas from "../../components/BranchCanvas";

// Catch-all route: branch names contain a slash (e.g. "claude/corgi-branch"),
// so the name arrives as path segments and is rejoined here. Keeping the name
// in the URL means the screen survives refresh and is shareable without any
// persistence layer.
export default async function BranchPage({
  params,
}: {
  params: Promise<{ name: string[] }>;
}) {
  const { name } = await params;
  const branchName = decodeURIComponent(name.join("/"));
  return <BranchCanvas branchName={branchName} />;
}
