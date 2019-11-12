using AngApi.DAL.Model;
using AngApi.DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.BLL
{
    public interface IEmployee
    {
        Employee UpsertEmployee(Employee employee);
        IEnumerable<Employee> GetEmployees();
        bool DeleteEmployee(long employeeId);
        Employee GetEmployee(long Id);
    }
    public class BLEmployee : IEmployee
    {
        private readonly IUnitOfWork _uow;

        public BLEmployee(IUnitOfWork uow)
        {
            this._uow = uow;
        }
        public bool DeleteEmployee(long employeeId)
        {
            _uow.Employee.DeleteEmployee(employeeId);
            _uow.Complete();
            return true;
        }

        public Employee GetEmployee(long Id)
        {
            if (Id <= default(long))
                throw new ArgumentException("Invalid id");

            return _uow.Employee.GetEmployee(Id);
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return _uow.Employee.GetEmployees();
        }

        public Employee UpsertEmployee(Employee employee)
        {
            if (employee == null)
                throw new ArgumentException("Invalid user");

            if (string.IsNullOrWhiteSpace(employee.Name))
                throw new ArgumentException("Invalid employee name");

            var _employee = _uow.Employee.GetEmployee(employee.Id);
            if (_employee == null)
            {
                _employee = new Employee
                {
                    Name = employee.Name
                };
                _uow.Employee.AddEmployee(_employee);
            }
            else
            {
                _employee.Name = employee.Name;
            }

            _uow.Complete();

            return _employee;
        }
    }
}
