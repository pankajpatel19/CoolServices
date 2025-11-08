import redisCLient from "../../config/redis.config.js";
import Service from "../../Models/Services.model.js";
export const addService = async (req, res) => {
  try {
    const { appliance, name, price, videoUrl, description } = req.body;
    const service = new Service({
      appliance,
      name,
      price,
      videoUrl,
      description,
    });
    await service.save();
    res.status(201).json({ message: "Service added successfully", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getServicesByAppliance = async (req, res) => {
  try {
    const { appliance } = req.query;

    const redisProvide = await redisCLient.get(`applience : ${appliance}`);

    if (redisProvide) {
      return res.status(200).json(JSON.parse(redisProvide));
    }
    const services = await Service.find({ appliance });

    await redisCLient.setEx(
      `applience : ${appliance}`,
      21600,
      JSON.stringify(services)
    );

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
