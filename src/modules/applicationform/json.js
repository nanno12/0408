{
  "type": "SUCCESS",
  "requstUrl": null,
  "funName": null,
  "data": {
    "COMONENTCLASSLIST": [
      {
        "DETAILTYPELIST": [
          {
            "LIST_NO": "1",
            "ITEM_CODE": "003",
            "ITEM_AMOUNT": "2",
            "ITEM_UNIT": "U",
            "ITEM_AMOUNT_ML": "200",
            "ITEM_AMOUNT_U": "1",
            "ITEM_ADDFACTOR": "0.5",
            "ITEM_REMARK": "1U=200ML",
            "ITEM_NAME": "悬浮红细胞",
            "MAIN_CODE": "02",
            "MAIN_NAME": "红细胞类"
          }
        ],
        "MAINNAME": "红细胞类",
        "MAINCODE": "02",
        "MAINTRIGGE": [
          {
            "TRANSFUSIONADVICE": false,
            "CORELIST": [
              {
                "TRF_TRIGGERDIC_ID": 1,
                "MAINTYPE_CODE": "02",
                "RULE_NAME": "血红蛋白",
                "ITEM_CONDITION": "血红蛋白小于60与红细胞压积小于等于0.20",
                "LOGIC_CODE": "",
                "LOGIC_NAME": "",
                "CONDITION_GROUP": "",
                "ITEM_CODE": "HGB",
                "ITEM_NAME": "血红蛋白",
                "RELATION_CODE": "<",
                "RELATION_NAME": "<",
                "ITEM_VALUE": "60"
              },
              {
                "TRF_TRIGGERDIC_ID": 1,
                "MAINTYPE_CODE": "02",
                "RULE_NAME": "血红蛋白",
                "ITEM_CONDITION": "血红蛋白小于60与红细胞压积小于等于0.20",
                "LOGIC_CODE": "and",
                "LOGIC_NAME": "与",
                "CONDITION_GROUP": "",
                "ITEM_CODE": "HCT",
                "ITEM_NAME": "红细胞压积",
                "RELATION_CODE": "<",
                "RELATION_NAME": "<",
                "ITEM_VALUE": "0.20"
              }
            ],
            "MAINTYPECODE": "02",
            "ITEMCONDITION": "血红蛋白小于60与红细胞压积小于等于0.20",
            "TRIGGERDICCODE": "1"
          }
        ]
      },
      {
        "DETAILTYPELIST": [
          {
            "LIST_NO": "1",
            "ITEM_CODE": "001",
            "ITEM_AMOUNT": "400",
            "ITEM_UNIT": "ml",
            "ITEM_AMOUNT_ML": "1",
            "ITEM_AMOUNT_U": "",
            "ITEM_ADDFACTOR": "50",
            "ITEM_REMARK": "1U=200ML",
            "ITEM_NAME": "全血去白",
            "MAIN_CODE": "01",
            "MAIN_NAME": "全血类"
          }
        ],
        "MAINNAME": "全血类",
        "MAINCODE": "01",
        "MAINTRIGGE": [
          
        ]
      },
      {
        "DETAILTYPELIST": [
          {
            "LIST_NO": "1",
            "ITEM_CODE": "009",
            "ITEM_AMOUNT": "1",
            "ITEM_UNIT": "U",
            "ITEM_AMOUNT_ML": "1",
            "ITEM_AMOUNT_U": "",
            "ITEM_ADDFACTOR": "0.5",
            "ITEM_REMARK": "1U=200ML",
            "ITEM_NAME": "血小板",
            "MAIN_CODE": "04",
            "MAIN_NAME": "血小板"
          }
        ],
        "MAINNAME": "血小板",
        "MAINCODE": "04",
        "MAINTRIGGE": [
          {
            "TRANSFUSIONADVICE": false,
            "CORELIST": [
              {
                "TRF_TRIGGERDIC_ID": 4,
                "MAINTYPE_CODE": "04",
                "RULE_NAME": "血小板计数",
                "ITEM_CONDITION": "血小板计数小于等于50",
                "LOGIC_CODE": "",
                "LOGIC_NAME": "",
                "CONDITION_GROUP": "",
                "ITEM_CODE": "PLT",
                "ITEM_NAME": "血小板计数",
                "RELATION_CODE": "<",
                "RELATION_NAME": "<",
                "ITEM_VALUE": "50"
              }
            ],
            "MAINTYPECODE": "04",
            "ITEMCONDITION": "血小板计数小于等于50",
            "TRIGGERDICCODE": "4"
          }
        ]
      }
    ],
    "APPLYBLOOD": "500ml"
  },
  "message": "",
  "messageCode": "",
  "failtCode": null,
  "link": null,
  "serverTime": "2020-03-28 15:28:41"
}