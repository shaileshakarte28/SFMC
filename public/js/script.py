from snowflake.connector import connect

def sf_connect(
    user:str,
    account:str,
    warehouse:str,
    database:str,
    schema:str,
    password:str,
    )->connect:
    """
    Utilized to connect with Snowflake
 
    :param: Use Credentials to Connect to Snowflake.
    :return:
    """
    try:
        if password == None:
            
            print("Service Account Password is required!")
            return None
        else:
            con = connect(
                        user=user, account=account, password=password, warehouse=warehouse, 
                        database=database, schema=schema
                        )
 
            return con
    except Exception as e:
        print(f"Error while loading credentials: {e}")
        
        
def log_process(user, account, database, schema, warehouse, password, log_message, jobID, process_name):
    
    con = sf_connect(user=user, account=account, warehouse=warehouse,
                    database=database, schema=schema,
                    password=password)
 
    tbl_SFMC_SVC_LOG = 'SFMC_SVC_LOG'
    job_id_str = "'{}'".format(jobID)
    log_message = "'{}'".format(log_message.replace("'","''"))
    
    cursor = con.cursor()
    
    use_warehouse = f"""USE WAREHOUSE {warehouse};"""
 
    cursor.execute(use_warehouse)
    
    log_process = f"""insert into {database}.{schema}.{tbl_SFMC_SVC_LOG}(job_id,process_name,log_message) values({job_id_str},{process_name},{log_message});"""
    
    cursor.execute(log_process)
    
    cursor.execute("commit;")

log_process("SVC_SFDC_DEV", "odp.us-east-1",  "ODP_DEV", "sfmc_ds", "DEVELOPER_WH", "SFDC+OfficeD3pot", "123", "123", "123")