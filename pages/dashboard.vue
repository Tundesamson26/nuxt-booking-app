<template>
  <section class="container">
    <table class="table is-selected-columns-mobile">
      <thead class="table-thead">
        <tr class="table-row">
          <th class="table-thead-col">
            <span class="eyebrow-heading-3">Full Name</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 120"
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
          :key="booking.id"
        >
          <td class="table-col" data-title="Name" :name="booking.name">
            <div class="u-inline-flex u-cross-center u-gap-12">
              <span class="text u-break-word u-line-height-1-5">{{
                name
              }}</span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Message" :message="booking.message">
            <div class="text">
              <span class="text">{{ message }}</span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Date" :date="booking.date">
            <span class="text">{{ date }}</span>
          </td>
          <td class="table-col is-only-desktop" data-title="Time" :time="booking.time">
            <time class="text">{{ time }}</time>
          </td>
          <td class="table-col u-overflow-visible">
            <button
              class="button is-text is-only-icon"
              aria-label="more options"
            >
              <span class="icon-dots-horizontal" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    {{ bookings }}
  </section>
</template>
<script>
import { account, client } from "~/utils/web -init";

account.createAnonymousSession().then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);

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
  },
};
</script>
