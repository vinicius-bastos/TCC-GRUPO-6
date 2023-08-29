import boto3

def scan(params):
    try:
        dynamodb_client = boto3.client('dynamodb')
        result = dynamodb_client.scan(**params)
        # print(result)
        return result
    except Exception as e:
        raise e

def get_all_items(table, filter_expression=None):
    try:
        items = []
        last_evaluated_key = None
        # cont = 0

        while True:
            # cont = cont + 1
            scan_filter_option = {}

            if last_evaluated_key:
                scan_filter_option['ExclusiveStartKey'] = last_evaluated_key
            
            if filter_expression:
                scan_filter_option['FilterExpression'] = filter_expression

            result = scan({
                'TableName': table,
                **scan_filter_option
            })

            items.extend(result['Items'])

            # if cont == 1:
            #   break

            if 'LastEvaluatedKey' in result:
                last_evaluated_key = result['LastEvaluatedKey']
            else:
                break
        # print(items)
        return items
    except Exception as e:
        raise e

# # Nome da sua tabela
# table_name = 'call-alien-vault-tcc-dev-pulses-subscribed'
# filter_expression = 'public = :value'  # Exemplo de filtro em formato de expressão
# expression_attribute_values = {':value': {'N': '1'}}

# try:
#     items = get_all_items(table_name)
#     # print(items)
# except Exception as e:
#     print("Erro:", e)
