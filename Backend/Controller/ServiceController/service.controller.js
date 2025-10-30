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

    const services = await Service.find({ appliance });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
