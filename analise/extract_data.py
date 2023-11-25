import boto3

def scan(params):
    try:
        dynamodb_client = boto3.client('dynamodb')
        result = dynamodb_client.scan(**params)
        return result
    except Exception as e:
        raise e


def get_all_items(table, filter_expression=None):
    try:
        items = []
        last_evaluated_key = None

        while True:
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

            if 'LastEvaluatedKey' in result:
                last_evaluated_key = result['LastEvaluatedKey']
            else:
                break
        print(items)
        return items
    except Exception as e:
        raise e
