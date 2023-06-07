<template>
  <section>
    <div
      class="u-flex u-main-space-between u-cross-center"
      style="
        padding: 5px;
        background-color: rgb(219, 26, 90);
        color: white;
        margin-bottom: 20px;
      "
    >
      <h1 class="u-text-center u-font-size-32">Book Me</h1>
      <NuxtLink to="/dashboard" class="u-small" style="padding-right: 30px"
        >Dashboard</NuxtLink
      >
    </div>
    <div
      class="card u-cross-center u-width-full-line u-max-width-500"
      style="margin: auto"
    >
      <div class="u-flex u-main-space-between u-cross-center">
        <h6 class="heading-level-6 u-text-center">New Guest</h6>
      </div>

      <form
        method="post"
        @submit.prevent="uploadBooking"
        class="form u-margin-block-start-24"
      >
        <ul class="form-list">
          <li class="form-item">
            <label class="label">Full Name</label>
            <div class="input-text-wrapper">
              <input
                type="text"
                class="input-text u-padding-inline-end-56"
                placeholder="Full name"
                name="name"
                v-model.lazy="name"
              />
            </div>
          </li>
          <div class="u-flex u-main-space-between u-cross-center">
            <li class="form-item">
              <label class="label">Check-In</label>
              <div class="input-text-wrapper">
                <input
                  type="date"
                  name="date"
                  v-model="date"
                  :min="minDate"
                  :max="maxDate"
                />
              </div>
            </li>
            <li class="form-item">
              <label class="label">Time</label>
              <div class="input-text-wrapper">
                <select name="time" v-model="time">
                  <option>2pm - 3pm</option>
                  <option>4pm - 5pm</option>
                  <option>6pm - 7pm</option>
                  <option>8pm - 9pm</option>
                </select>
              </div>
            </li>
          </div>
          <li class="form-item">
            <label class="label">Message</label>
            <div class="input-text-wrapper">
              <textarea
                class="input-text"
                placeholder="Type here..."
                name="message"
                v-model.lazy="message"
                style="height: 80px"
              ></textarea>
            </div>
          </li>
        </ul>

        <div class="form-footer">
          <div class="u-flex u-main-end u-gap-12">
            <button class="button" type="submit" @click.prevent="uploadBooking">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
  <div></div>
</template>
<script lang="ts">
import "@appwrite.io/pink"; // optionally, add icons
import "@appwrite.io/pink-icons";
import { client, databases } from "~/utils/web -init";

account.createAnonymousSession().then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);

export default {
  data() {
    return {
      name: "",
      message: "",
      date: "",
      time: "",
      minDate: "2023-06-01", // Define the minimum selectable date
      maxDate: "2023-06-30",
    };
  },
  computed: {
    blockedDates() {
      return ["2023-06-10", "2023-06-15", "2023-06-20"]; // Replace with your actual blocked dates array
    },
  },
  mounted() {
    if (account.get !== null) {
      try {
        client.subscribe("documents", (response) => {
          console.log(response);
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  },

  methods: {
    async uploadBooking() {
      if (this.blockedDates.includes(this.date)) {
        alert("This date is blocked for booking");
        return; // Stop the execution of the method
      }
      try {
        await databases
          .createDocument(
            "64681868ceef66544a00",
            "64681913b4c68fd83d28",
            "unique()",
            {
              name: this.name,
              message: this.message,
              date: this.date,
              time: this.time,
            }
          )
          .then((response) => {
            console.log(response); // Success
            alert("booking sent in");
            // this.$router.push({ path: `dashboard` });
          });
      } catch (error) {
        console.log(error); // Failure
      }
    },
  },
};
</script>
