const OrdersTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full border border-muted text-left text-sm shadow-md">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center"></div>
            </th>
            <th scope="col" class="px-6 py-3">
              User
            </th>
            <th scope="col" class="px-6 py-3">
              Items
            </th>
            <th scope="col" class="px-6 py-3">
              Total Price
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Address
            </th>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b bg-gray-100 duration-200 hover:bg-gray-50">
            <td class="w-4 p-4">
              <div class="flex items-center">2</div>
            </td>
            <th
              scope="row"
              class="flex flex-col gap-2 whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900"
            >
              <span>Amirhossein</span>
              <span>emirkh165@gmail.com</span>
            </th>
            <td class="px-6 py-4">iPhone 13 Promax 128GB White</td>
            <td class="px-6 py-4">$452</td>
            <td class="px-6 py-4">
              <span className="rounded-lg bg-orange-300 px-4 py-1 text-sm font-semibold text-orange-500">
                Pending
              </span>
            </td>
            <td class="px-6 py-4">Emam Street , 45</td>
            <td class="px-6 py-4 text-gray-500">25 days ago</td>
            <td class="flex items-center gap-3 px-6 py-4">
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View
              </a>
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
              <a
                href="/sdfds"
                class="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr class="border-b bg-gray-100 duration-200 hover:bg-gray-50">
            <td class="w-4 p-4">
              <div class="flex items-center">2</div>
            </td>
            <th
              scope="row"
              class="flex flex-col gap-2 whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900"
            >
              <span>Amirhossein</span>
              <span>emirkh165@gmail.com</span>
            </th>
            <td class="px-6 py-4">iPhone 13 Promax 128GB White</td>
            <td class="px-6 py-4">$452</td>
            <td class="px-6 py-4">
              <span className="rounded-lg bg-orange-300 px-4 py-1 text-sm font-semibold text-orange-500">
                Pending
              </span>
            </td>
            <td class="px-6 py-4">Emam Street , 45</td>
            <td class="px-6 py-4 text-gray-500">25 days ago</td>
            <td class="flex items-center gap-3 px-6 py-4">
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View
              </a>
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
              <a
                href="/sdfds"
                class="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr class="border-b bg-gray-100 duration-200 hover:bg-gray-50">
            <td class="w-4 p-4">
              <div class="flex items-center">2</div>
            </td>
            <th
              scope="row"
              class="flex flex-col gap-2 whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900"
            >
              <span>Amirhossein</span>
              <span>emirkh165@gmail.com</span>
            </th>
            <td class="px-6 py-4">iPhone 13 Promax 128GB White</td>
            <td class="px-6 py-4">$452</td>
            <td class="px-6 py-4">
              <span className="rounded-lg bg-emerald-300 px-4 py-1 text-sm font-semibold text-emerald-600">
                Delivered
              </span>
            </td>
            <td class="px-6 py-4">Emam Street , 45</td>
            <td class="px-6 py-4 text-gray-500">25 days ago</td>
            <td class="flex items-center gap-3 px-6 py-4">
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View
              </a>
              <a
                href="/sdf"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
              <a
                href="/sdfds"
                class="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
