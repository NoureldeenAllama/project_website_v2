import { menuItems } from "../data/store.js";

// GET /api/menu
export function getMenu(req, res, next) {
  try {
    return res.json({ items: menuItems });
  } catch (err) {
    next(err);
  }
}
