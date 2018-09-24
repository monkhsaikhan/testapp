<template>
  <div class="container">
    <loading :active.sync="isLoading" 
        :can-cancel="true"
        :is-full-page="fullPage"></loading>
    <form class="col-sm-6 offset-md-3">
      <h4>Add Category</h4>
      <div class="form-group">
        <label for="id">id</label>
        <input type="number" class="form-control" id="id" v-model="list.id">
      </div>
      <div class="form-group">
        <label for="name01">name01</label>
        <input type="text" class="form-control" id="name01" v-model="list.name01">
      </div>
      <div class="form-group">
        <label for="name01En">name01En</label>
        <input type="text" class="form-control" id="name01En" v-model="list.name01En">
      </div>
      <div class="form-group">
        <label for="name02">name01</label>
        <input type="text" class="form-control" id="name02" v-model="list.name02">
      </div>

      <div class="form-group">
        <label for="companyInfo_id">companyInfo_id</label>
        <input type="number" class="form-control" id="companyInfo_id" v-model="list.companyInfo_id">
      </div>
      <div class="form-group">
        <label for="clientInfo_id">clientInfo_id</label>
        <input type="number" class="form-control" id="clientInfo_id" v-model="list.clientInfo_id">
      </div>
      <div class="form-group">
        <label for="industry_id">industry_id</label>
        <input type="number" class="form-control" id="industry_id" v-model="list.industry_id">
      </div>
      <input type="button" @click="addCat" class="btn btn-primary" value="OK">
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.min.css";
export default {
  data() {
    return {
      list: {
        id: 1,
        name01: "",
        name01En: "",
        name02: "",
        companyInfo_id: 0,
        clientInfo_id: 0,
        industry_id: 0
      },
      isLoading: false,
      fullPage: true
    };
  },
  name: "add",
  components: {
    Loading
  },
  methods: {
    ...mapGetters(["getToken"]),
    addCat() {
      this.axios.defaults.headers = {
        Authorization: "Bearer " + this.getToken()
      };
      this.isLoading = true;
      this.axios
        .post(
          "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryAdd",
          this.list
        )
        .then(response => {
          console.log(response);
          this.isLoading = false;
          this.list = {};
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
