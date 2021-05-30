const router = require("express").Router();
const db = require("../db");
//@desc show all restrent
//@ route get/api/
router.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM RESTRENT ORDER BY id");
  console.log(data.rows);
  res.status(200).json({
    sucess: data.rows,
  });
});
//@desc add new restrent
//@ route post/api/
router.post("/", async (req, res) => {
  const { name, price_range, location } = req.body;
  console.log(name);
  if (!name || !price_range || !location)
    return res.status(400).json({ error: "fill all field" });

  try {
    const added = await db.query(
      "INSERT INTO restrent (name,price_range,location)VALUES($1,$2,$3)",
      [name, price_range, location]
    );
    res.status(201).json("sucess fully added restrent");
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "something went wrong" });
  }
});
//@desc for get single restrent
//@route get/api/id
router.get("/:id", async (req, res) => {
  try {
    const single_data = await db.query(
      `SELECT * FROM restrent WHERE id = ${req.params.id}`
    );
    res.json(single_data.rows);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "something went wrong" });
  }
});

//@desc for put single restrent
//@route put/api/id
router.put("/:id", async (req, res) => {
  try {
      const {name,price,location} = req.body;
         await db.query(
      `UPDATE restrent SET 
      name = $1,
      location = $2 ,
      price_range = $3 
      WHERE id = ${req.params.id} `,
      [name,location,price]
    );
    res.json('successfuly updated data');
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "something went wrong" });
  }
});

//@dsc delete specific data
//@route delete /api/id
router.delete('/:id',async(req,res)=>{
    try {
        await db.query(`DELETE FROM restrent WHERE id = ${req.params.id}`);
        res.json('deleted successfuly');
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "something went wrong" });
    }
}) 

module.exports = router;
