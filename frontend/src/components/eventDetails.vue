<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Update Event</h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Event Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
              <span style="color:#ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.eventName" />
              <span class="text-black" v-if="v$.event.eventName.$error">
                <p class="text-red-700" v-for="error of v$.event.eventName.$errors" :key="error.$uid">{{ error.$message
                }}!</p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
              <span style="color:#ff0000">*</span>
              <input
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date" type="date" />
              <span class="text-black" v-if="v$.event.date.$error">
                <p class="text-red-700" v-for="error of v$.event.date.$errors" :key="error.$uid">{{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"></textarea>
                <!-- fixed the description not showing -->
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col grid-cols-3">
            <label>Services Offered at Event</label>
            <div>
              <label for="familySupport" class="inline-flex items-center">
                <input type="checkbox" id="familySupport" value="Family Support" v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  notchecked />
                <span class="ml-2">Family Support</span>
              </label>
            </div>
            <div>
              <label for="adultEducation" class="inline-flex items-center">
                <input type="checkbox" id="adultEducation" value="Adult Education" v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  notchecked />
                <span class="ml-2">Adult Education</span>
              </label>
            </div>
            <div>
              <label for="youthServices" class="inline-flex items-center">
                <input type="checkbox" id="youthServices" value="Youth Services Program" v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  notchecked />
                <span class="ml-2">Youth Services Program</span>
              </label>
            </div>
            <div>
              <label for="childhoodEducation" class="inline-flex items-center">
                <input type="checkbox" id="childhoodEducation" value="Early Childhood Education"
                  v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  notchecked />
                <span class="ml-2">Early Childhood Education</span>
              </label>
            </div>
          </div>
        </div>

        <!-- grid container -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Address</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <span style="color:#ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="event.address.line1" />
              <span class="text-black" v-if="v$.event.address.line1.$error">
                <p class="text-red-700" v-for="error of v$.event.address.line1.$errors" :key="error.$uid">{{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="event.address.line2" />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color:#ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="event.address.city" />
                <span class="text-black" v-if="v$.event.address.city.$error">
                <p class="text-red-700" v-for="error of v$.event.address.city.$errors" :key="error.$uid">{{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <span style="color:#ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="event.address.county" />
                <span class="text-black" v-if="v$.event.address.county.$error">
                <p class="text-red-700" v-for="error of v$.event.address.county.$errors" :key="error.$uid">{{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <span style="color:#ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="event.address.zip" />
                <span class="text-black" v-if="v$.event.address.zip.$error">
                <p class="text-red-700" v-for="error of v$.event.address.zip.$errors" :key="error.$uid">{{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div class="flex justify-between mt-10 mr-20">
            <button @click="handleEventUpdate" type="submit" class="bg-red-700 text-white rounded">Update Event</button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click="$router.go(-1)">Go
              back</button>
          </div>
          <!-- made a button call a function (deleteEvent) to send the api requests to delete an event -->
          <div class="flex justify-between mt-10 mr-20">
            <button type="submit" class="bg-red-700 text-white rounded" @click="deleteEvent">Delete Event</button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />

        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to edit/display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">City</th>
                  <th class="p-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr @click="editClient(client.attendeeID)" v-for="client in attendeeData" :key="client._id">
                  <td class="p-2 text-left">{{ client.attendeeFirstName + " " + client.attendeeLastName }}</td>
                  <td class="p-2 text-left">{{ client.attendeeCity }}</td>
                  <td class="p-2 text-left">{{ client.attendeePhoneNumber }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, /*email, alpha, numeric */} from "@vuelidate/validators";
import axios from "axios";
import { DateTime } from "luxon";
import Swal from "sweetalert2";

export default {
  props: ["id"],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      attendeeIDs: [],
      attendeeData: [],
      checkedServices: [],
      event: {
        eventName: "",
        services: [],
        date: "",
        address: {
          line1: "",
          line2: "",
          city: "",
          county: "",
          zip: "",
        },
        description: "",
      },
    };
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API + `/eventdata/id/${this.$route.params.id}`
      )
      .then((resp) => {
        let data = resp.data[0];
        this.event.eventName = data.eventName;
        console.log(data.date);
        this.event.date = DateTime.fromISO(data.date).plus({ days: 1 }).toISODate();
        this.event.description = data.description;
        this.checkedServices = data.services;
        this.event.address = data.address;
        this.attendeeIDs = data.attendees;
        for (let i = 0; i < this.attendeeIDs.length; i++) {
          axios
            .get(
              import.meta.env.VITE_ROOT_API +
              `/primarydata/id/${this.attendeeIDs[i]}`
            )
            .then((resp) => {
              let data = resp.data[0];
              this.attendeeData.push({
                attendeeID: this.attendeeIDs[i],
                attendeeFirstName: data.firstName,
                attendeeLastName: data.lastName,
                attendeeCity: data.address.city,
                attendeePhoneNumber: data.phoneNumbers[0].primaryPhone,
              });
            });
        }
      });
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    async handleEventUpdate() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate();
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
      this.event.services = this.checkedServices;
      let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/${this.id}`;
      axios.put(apiURL, this.event).then(() => {
        Swal.fire(
          'Update has been saved!',
          'Task Complete!',
          'success'
        )
        this.$router.back().catch((error) => {
          console.log(error);
        });
      });
    }
    },
    editClient(clientID) {
      this.$router.push({ name: "updateclient", params: { id: clientID } });
    },
    deleteEvent() {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Event has been deleted.',
            'success'
          )
          let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/delete/${this.id}`;
          axios.delete(apiURL).then(() => {
            this.$router.back().catch((error) => {
              console.log(error);
            });
          });
        }
      });
    },
  },
  // sets validations for the various data properties
  validations() {
    return {
      event: {
        eventName: { required },
        date: { required },
        address :{
          line1: {required},
          city: {required},
          county: {required},
          zip: {required}
        },
      },
    };
  },
};
</script>