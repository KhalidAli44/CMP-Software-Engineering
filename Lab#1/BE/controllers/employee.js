const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  let index = employee.findIndex( emp => emp.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  employee.splice(index, 1);
  res.status(204).send();
};

// TODO
exports.createEmployee = async (req, res, next) => {
  let emp = { id: req.body.id, name: req.body.name };
  employee.push(emp);
  res.status(201).json(emp);
};
