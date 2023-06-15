export default async function handler(req, res) {
   try {
      if (req.method === "DELETE") {
         console.log("Funciona");
         return res.status(200).json({ message: "hola" });
      }

      return res.status(400).end();
   } catch (error) {
      console.log(error);

      return res.status(500).end();
   }
}
