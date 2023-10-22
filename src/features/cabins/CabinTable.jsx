import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
  // const {
  //   isLoading,
  //   data: cabins,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (!cabins) return <Empty resource="cabins" />;

  if (isLoading) return <Spinner />;
  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  function compare(a, b) {
    if (a["name"].toLowerCase() < b["name"].toLowerCase()) {
      return -1 * modifier;
    }
    if (a["name"].toLowerCase() > b["name"].toLowerCase()) {
      return 1 * modifier;
    }
    return 0;
  }

  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(compare)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2fr 1fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
