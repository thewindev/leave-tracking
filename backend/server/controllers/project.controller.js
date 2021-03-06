import Project from '../models/project.model';
import User from '../models/user.model';

function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req.project = project;
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.project);
}

function create(req, res, next) {
  const project = new Project({
    approvers: req.body.approvers,
    name: req.body.name,
    description: req.body.description,
  });

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

function update(req, res, next) {
  const project = req.project;
  project.approvers = req.body.approvers;
  project.name = req.body.name;
  project.description = req.body.description;


  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Project.list({ limit, skip })
    .then(projects => res.json(projects))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const project = req.project;
  project.remove()
    .then(deletedProject => res.json(deletedProject))
    .catch(e => next(e));
}

function getUsers(req, res, next) {
  const { projectId } = req.params;
  User.find({projectId})
    .then(users => res.json(users))
    .catch(e => next(e));
}

async function getApprovers(req, res, next) {
  const { projectId } = req.params;
  const { approvers } = await Project.findOne({ _id: projectId });
  const users = await Promise.all(approvers.map(async (approver) => {
    let user = await User.findOne({ _id: approver });
    const noPasswodUser = user.toObject();
    delete noPasswodUser.password;

    return noPasswodUser;
  }));

  res.json(users);
}

export default { load, get, create, update, list, remove, getUsers, getApprovers };
