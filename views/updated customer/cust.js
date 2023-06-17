var data = [
    {
      Date: "2023-06-16",
      BoxID: "BOX001",
      VaccineID: "VAC001",
      VaccineName: "Pfizer-BioNTech",
      Count: 100,
      ManufacturingDate: "2023-01-01",
      ExpiryDate: "2023-12-31",
      Location: "Kottayam",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX002",
      VaccineID: "VAC002",
      VaccineName: "Moderna",
      Count: 75,
      ManufacturingDate: "2023-02-15",
      ExpiryDate: "2023-12-31",
      Location: "Pala",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX003",
      VaccineID: "VAC003",
      VaccineName: "Johnson & Johnson",
      Count: 50,
      ManufacturingDate: "2023-03-20",
      ExpiryDate: "2023-12-31",
      Location: "Choondacherry",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX004",
      VaccineID: "VAC004",
      VaccineName: "AstraZeneca",
      Count: 120,
      ManufacturingDate: "2023-04-10",
      ExpiryDate: "2023-12-31",
      Location: "Vaikom",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX005",
      VaccineID: "VAC005",
      VaccineName: "Sinovac",
      Count: 90,
      ManufacturingDate: "2023-05-05",
      ExpiryDate: "2023-12-31",
      Location: "Manimala",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX006",
      VaccineID: "VAC006",
      VaccineName: "Novavax",
      Count: 60,
      ManufacturingDate: "2023-06-01",
      ExpiryDate: "2023-12-31",
      Location: "Ettumanoor",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX007",
      VaccineID: "VAC007",
      VaccineName: "Sputnik V",
      Count: 80,
      ManufacturingDate: "2023-07-15",
      ExpiryDate: "2023-12-31",
      Location: "Pala",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX008",
      VaccineID: "VAC008",
      VaccineName: "Covishield",
      Count: 70,
      ManufacturingDate: "2023-08-20",
      ExpiryDate: "2023-12-31",
      Location: "Kottayam",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX009",
      VaccineID: "VAC009",
      VaccineName: "Bharat Biotech",
      Count: 110,
      ManufacturingDate: "2023-09-10",
      ExpiryDate: "2023-12-31",
      Location: "Pala",
      Status: "Available",
    },
    {
      Date: "2023-06-16",
      BoxID: "BOX010",
      VaccineID: "VAC010",
      VaccineName: "Covovax",
      Count: 65,
      ManufacturingDate: "2023-10-05",
      ExpiryDate: "2023-12-31",
      Location: "Kochi",
      Status: "Available",
    },
  ];
  var cur_count = 0;
  
  function reload() {
    location.reload();
  }
  
  function get_one() {
    if (cur_count == data.length) {
      alert("no more record");
      return;
    }
    let d = data[cur_count++];
    Object.keys(d).forEach((element) => {
      addItem(d[element], element);
    });
  }
  
  function get_all() {
    if (cur_count == data.length) {
      alert("no more record");
      return;
    }
    while (cur_count < data.length) {
      var d = data[cur_count++];
      Object.keys(d).forEach((element) => {
        addItem(d[element], element);
      });
    }
  
  }
  
  function addItem(data, topic) {
    console.log(data, topic);
    let l = document.createElement("li");
    l.classList.add("items");
    l.innerText = `${data}`;
    document.getElementById(topic).appendChild(l);
  }
  