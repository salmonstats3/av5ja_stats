import axios from "axios";

const base_url = "https://api.splatnet3.com";

const data = (await axios.get(base_url)).data;
console.log(data);
