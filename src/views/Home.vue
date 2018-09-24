<template>
  <div class="container">
    <h4>Category List</h4>
   <loading :active.sync="isLoading" 
        :can-cancel="true"
        :is-full-page="fullPage"></loading>
    <table class="table" v-if="lists">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Industry Name</th>
          <th scope="col">name01</th>
          <th scope="col">name02</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in lists" :key="list.id">
          <th scope="row">{{list.id}}</th>
          <td>{{list.industry_name}}</td>
          <td>{{list.name01}}</td>
          <td>{{list.name02}}</td>
          <td><router-link :to='"/"+list.id'>View</router-link> | <span @click="deleteList(list)">Delete</span> | <router-link :to='"/edit/"+list.id'>Edit</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.min.css";
import swal from "sweetalert";

export default {
  name: "home",
  data: function() {
    return {
      lists: {},
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    ...mapMutations(["ADD_TOKEN"]),
    ...mapGetters(["getToken"]),
    getList() {
      this.axios.defaults.headers = {
        Authorization: "Bearer " + this.getToken()
      };
      this.axios
        .get(
          "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryList?current=1&pageSize=50"
        )
        .then(response => {
          this.lists = response.data.value;
          console.log(this.lists);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteList(list) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this category!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.axios.defaults.headers = {
            Authorization: "Bearer " + this.getToken()
          };
          this.axios
            .post(
              "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryDelete?id=" +
                list.id
            )
            .then(response => {
              // console.log(response);
              this.lists.splice(this.lists.indexOf(list), 1);
              swal("Poof! Your category has been deleted!", {
                icon: "success"
              });
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          swal("Your category file is safe!");
        }
      });
    }
  },
  created() {
    this.axios.defaults.headers = {
      "Access-Control-Allow-Origin": "*"
    };

    this.isLoading = true;
    this.axios
      .post("http://api-tbaito1.azurewebsites.net/api/AccountManager/Login", {
        email: "company@t-baito.com",
        password: "Demo1234#"
      })
      .then(response => {
        console.log(response.data.token);
        this.ADD_TOKEN(response.data.token);
        this.getList();
        this.isLoading = false;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>


<style scoped>
span {
  color: red;
  cursor: pointer;
}
</style>
