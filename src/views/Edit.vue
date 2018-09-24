<template>
  <div class="container">
    <form class="col-sm-6 offset-md-3">
      <h4>Edit Category</h4>
      <div class="form-group">
        <label for="name01En">name01En</label>
        <input type="text" class="form-control" id="name01En" v-model="list.name01En">
      </div>
      <div class="form-group">
        <label for="name02">name02</label>
        <input type="text" class="form-control" id="name02" v-model="list.name02">
      </div>
      <div class="form-group">
        <label for="name01">name01</label>
        <input type="text" class="form-control" id="name01" v-model="list.name01">
      </div>
      <input type="button" class="btn btn-primary" @click="editCat" value="OK">
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: {}
    };
  },
  name: "edit",
  created() {
    this.axios.defaults.headers = {
      Authorization: "Bearer " + this.getToken()
    };
    this.axios
      .get(
        "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryGet?id=" +
          this.$route.params.id
      )
      .then(response => {
        this.list = response.data.value;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    ...mapGetters(["getToken"]),
    editCat() {
      this.axios.defaults.headers = {
        Authorization: "Bearer " + this.getToken()
      };
      this.axios
        .post(
          "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryEdit",
          this.list
        )
        .then(response => {
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
