import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      await modulesDao.updateModule(moduleId, moduleUpdates);
      const updatedModule = await modulesDao.findModuleById(moduleId);
      res.send(updatedModule);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
