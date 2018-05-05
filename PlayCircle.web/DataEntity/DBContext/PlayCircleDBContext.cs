namespace Portal.PlayCircle.DataEntity.DBContext
{
    using global::PlayCircle.web.DataEntity.DBContext;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Logging;
    using Portal.PlayCircle.DataEntity.EntityModels;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Data;
    using System.Data.Common;
    using System.Data.Entity;
    using System.Data.Entity.Core.Objects;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Configuration;

    public class PlayCircleDBContext : IdentityDbContext<USERINFO>, IDbContext
    {
        #region Public Declarations

        private const string AppConnectionString = "PlayCircleDBContext";
        private ObjectContext _objectContext;
        private DbTransaction _transaction;
        private static bool _databaseInitialized;
        private static readonly object Lock = new object();

        #endregion

        public PlayCircleDBContext()
            : base("name=" + AppConnectionString)
         {
            if (_databaseInitialized)
            {
                return;
            }
            lock (Lock)
            {
                if (!_databaseInitialized)
                {
                    Database.SetInitializer(new Seeder());
                    _databaseInitialized = true;
                }
            }
        }




        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<USERINFO>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");
        }

        public static PlayCircleDBContext Create()
        {
            return new PlayCircleDBContext();
        }

        //-- Table Integrations start --//

        public virtual DbSet<APPLICATIONs> Application { get; set; }

        //-- Table Integrations end --//

        //-- For oatuh start --//


        //-- For oauth end --//

        #region IDbcontext

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity
        {
            return base.Set<TEntity>();
        }

        public void SetAsAdded<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Added);
        }

        public void SetAsModified<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Modified);
        }

        public void SetAsDeleted<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Deleted);
        }

        public void BeginTransaction()
        {
            this._objectContext = ((IObjectContextAdapter)this).ObjectContext;
            if (_objectContext.Connection.State == ConnectionState.Open)
            {
                return;
            }
            _objectContext.Connection.Open();
            _transaction = _objectContext.Connection.BeginTransaction();
        }

        public int Commit()
        {
            try
            {
                BeginTransaction();
                var saveChanges = SaveChanges();
                _transaction.Commit();

                return saveChanges;
            }
            catch (Exception)
            {
                Rollback();
                throw;
            }
            finally
            {
                Dispose();
            }
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public async Task<int> CommitAsync()
        {
            try
            {
                BeginTransaction();
                var saveChangesAsync = await SaveChangesAsync();
                _transaction.Commit();

                return saveChangesAsync;
            }
            catch (Exception)
            {
                Rollback();
                throw;
            }
            finally
            {
                Dispose();
            }
        }

        private void UpdateEntityState<TEntity>(TEntity entity, EntityState entityState) where TEntity : BaseEntity
        {
            var dbEntityEntry = GetDbEntityEntrySafely(entity);
            dbEntityEntry.State = entityState;
        }

        private DbEntityEntry GetDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            var dbEntityEntry = Entry<TEntity>(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }
            return dbEntityEntry;
        }

        #endregion
    }

    public interface IDbContext : IDisposable
    {
        IDbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity;

        void SetAsAdded<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void SetAsModified<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void SetAsDeleted<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void BeginTransaction();

        int Commit();
        Task<int> CommitAsync();

        void Rollback();
    }

    public abstract class BaseEntity : IEntity
    {
        public BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
            RefId = Guid.NewGuid().ToString();
            IsActive = true;
        }
        [Key]
        public long Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string DeletedBy { get; set; }

        public bool IsActive { get; set; }

        public string RefId { get; set; }
    }

    public interface IEntity
    {
        long Id { get; set; }
        DateTime CreatedOn { get; set; }

        string CreatedBy { get; set; }

        DateTime? UpdatedOn { get; set; }

        string UpdatedBy { get; set; }

        DateTime? DeletedOn { get; set; }

        string DeletedBy { get; set; }

        bool IsActive { get; set; }

        string RefId { get; set; }
    }
}