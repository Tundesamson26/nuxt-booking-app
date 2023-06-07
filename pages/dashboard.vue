<template>
  <section class="container">
    <div>
      <h1 class="u-font-size-32 u-text-center u-line-height-2 u-capitalize">
        New Guests
      </h1>
    </div>
    <table class="table is-selected-columns-mobile">
      <thead class="table-thead">
        <tr class="table-row">
          <th class="table-thead-col" style="--p-col-width: 120">
            <span class="eyebrow-heading-3">Full Name</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 250"
          >
            <span class="eyebrow-heading-3">Messages</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 100"
          >
            <span class="eyebrow-heading-3">Date</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 120"
          >
            <span class="eyebrow-heading-3">Time</span>
          </th>
          <th class="table-thead-col" style="--p-col-width: 40"></th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr
          class="table-row"
          v-for="booking in bookings.documents"
          :key="booking.$id"
        >
        <!-- table data goes here... -->
          <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
              <span class="text u-break-word u-line-height-1-5">{{
                booking.name
              }}</span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Message">
            <div class="text">
              <span class="text">{{ booking.message }}</span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Date">
            <span class="text">{{ booking.date }}</span>
          </td>
          <td class="table-col is-only-desktop" data-title="Time">
            <time class="text">{{ booking.time }}</time>
          </td>
          <td class="table-col u-overflow-visible">
            <button
              class="button is-text is-only-icon"
              aria-label="more options"
              @click="deleteBookings(booking.$id)"
            >
              <span class="icon-trash" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import { account, client } from "~/utils/web -init";

export default {
  name: "dashboard",
  props: {
    name: String,
    message: String,
    date: String,
    time: String,
  },
  data() {
    return {
      bookings: [],
    };
  },
  mounted() {
    this.getBookings();
    if (account.get !== null) {
      try {
        client.subscribe("documents", (response) => {
          console.log(response);
          this.getBookings();
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  },
  methods: {
    async getBookings() {
      try {
        let bookingData = await databases.listDocuments(
          "64681868ceef66544a00",
          "64681913b4c68fd83d28"
        );
        console.log(bookingData);
        this.bookings = bookingData;
        console.log(response); // Success);
      } catch (error) {
        console.log(error, "error");
      }
    },

    async deleteBookings(document_id) {
      try {
        await databases.deleteDocument(
          "64681868ceef66544a00",
          "64681913b4c68fd83d28",
          document_id
        );
        alert("Item has been deleted successfully");
        await this.getBookings();
      } catch (error) {
        console.log("Error deleting product:", error.message);
        alert("Item was not deleted");
      }
    },
  },
};
</script>
