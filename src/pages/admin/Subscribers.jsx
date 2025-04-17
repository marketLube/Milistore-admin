import React, { useEffect, useState } from "react";
import { listSubscribers } from "../../sevices/userApis";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import PageHeader from "../../components/Admin/PageHeader";

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const res = await listSubscribers();
        setSubscribers(res?.data?.subscribers);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <PageHeader content="Subscribers" />
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((subscriber) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {subscriber?.name}
                </th>
                <td class="px-6 py-4">{subscriber?.email}</td>
                <td class="px-6 py-4">{subscriber?.phone}</td>
                <td class="px-6 py-4">
                  {new Date(subscriber?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Subscribers;
