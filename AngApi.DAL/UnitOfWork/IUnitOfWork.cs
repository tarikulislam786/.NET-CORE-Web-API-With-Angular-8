using AngApi.DAL.Model;
using AngApi.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AngApi.DAL.UnitOfWork
{
    public interface IUnitOfWork
    {
        
        ICalculationRepository Calculation { get; }
        IEmployeeRepository Employee { get; }
        IItemDetailRepository ItemDetailViewModel { get; }
        Task<int> CompleteAsync();
        int Complete();
    }
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AuthenticationContext _context;
        public UnitOfWork(AuthenticationContext context)
        {
            this._context = context;
        }

        private ICalculationRepository _Calculation;
        private IEmployeeRepository _Employee;
        private IItemDetailRepository _ItemDetail;
        public IEmployeeRepository Employee
        {
            get
            {
                if (this._Employee == null)
                {
                    this._Employee = new EmployeeRepository(_context);
                }
                return this._Employee;
            }
        }
        public ICalculationRepository Calculation
        {
            get
            {
                if (this._Calculation == null)
                {
                    this._Calculation = new CalculationRepository(_context);
                }
                return this._Calculation;
            }
        }

        public IItemDetailRepository ItemDetailViewModel
        {
            get
            {
                if (this._ItemDetail == null)
                {
                    this._ItemDetail = new ItemDetailRepository(_context);
                }
                return this._ItemDetail;
            }
        }
        public int Complete()
        {
            return _context.SaveChanges();
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose() => _context.Dispose();
    }
}
